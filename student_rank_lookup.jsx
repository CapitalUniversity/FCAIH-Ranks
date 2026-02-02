import React, { useState } from 'react';
import { Search, Award, BookOpen, AlertCircle, Loader2 } from 'lucide-react';

// CONFIGURATION - Update these Google Drive file IDs
// To get the file ID: Share the file → Get link → Extract the ID from the URL
// URL format: https://drive.google.com/file/d/FILE_ID_HERE/view?usp=sharing
const DRIVE_CONFIG = {
  2022: '1vD9K0jkjaBQWiowAhgZMQT7BKQKd_vpb',  // https://drive.google.com/file/d/1vD9K0jkjaBQWiowAhgZMQT7BKQKd_vpb/view?usp=sharing
  2023: '1OsK89EplPkHKfYze0BA8BmWcHPz0pLwR',  // https://drive.google.com/file/d/1OsK89EplPkHKfYze0BA8BmWcHPz0pLwR/view?usp=sharing
  2024: '1kGiOTU4eg8U1xNZbIS8bOwXn0VR3nAut',  // https://drive.google.com/file/d/1kGiOTU4eg8U1xNZbIS8bOwXn0VR3nAut/view?usp=sharing
  2025: '1BOtlCpMnhzmKvwoy6Psi3GTsyrfW4TBE',  // https://drive.google.com/file/d/1BOtlCpMnhzmKvwoy6Psi3GTsyrfW4TBE/view?usp=sharing
};

export default function StudentRankLookup() {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const getYear = (id) => {
    if (!id || id.length < 4) return null;
    return id.substring(0, 4);
  };

  const fetchStudentData = async (id) => {
    const year = getYear(id);
    if (!year || !DRIVE_CONFIG[year]) {
      setError(`Invalid student ID or year ${year} not configured`);
      return;
    }

    const fileId = DRIVE_CONFIG[year];
    if (fileId.startsWith('YOUR_')) {
      setError('Please configure Google Drive file IDs in the code');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Use Claude API to securely fetch and parse the CSV
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Fetch the CSV file from this Google Drive link: https://drive.google.com/uc?export=download&id=${fileId}

Then find the row where the id column matches "${id}" and return ONLY a JSON object with this exact format:
{
  "id": "the id",
  "specialization": "the specialization",
  "gpa": "the gpa",
  "credit_hours": "the credit_hours",
  "rank": "the rank",
  "error": "the error field or null"
}

If the student ID is not found, return:
{
  "found": false
}

Return ONLY the JSON, no explanation, no markdown formatting.`
          }]
        })
      });

      const data = await response.json();
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Invalid response from API');
      }

      const resultText = data.content[0].text.trim();
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('Could not parse response');
      }

      const studentData = JSON.parse(jsonMatch[0]);

      if (studentData.found === false) {
        setError(`Student ID ${id} not found in ${year} records`);
        setLoading(false);
        return;
      }

      setResult({
        ...studentData,
        year: year
      });

    } catch (err) {
      console.error('Error:', err);
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedId = studentId.trim();
    
    if (!trimmedId) {
      setError('Please enter a student ID');
      return;
    }

    if (!/^\d{8}$/.test(trimmedId)) {
      setError('Student ID must be 8 digits');
      return;
    }

    fetchStudentData(trimmedId);
  };

  const getRankColor = (rank) => {
    if (rank === 'N/A' || !rank) return 'text-gray-500';
    const numRank = parseInt(rank);
    if (numRank === 1) return 'text-yellow-500';
    if (numRank <= 10) return 'text-blue-500';
    if (numRank <= 50) return 'text-green-500';
    return 'text-gray-600';
  };

  const getRankBadge = (rank) => {
    if (rank === 'N/A' || !rank) return null;
    const numRank = parseInt(rank);
    if (numRank === 1) return '🥇 Top Student!';
    if (numRank <= 10) return '🏆 Top 10';
    if (numRank <= 50) return '⭐ Top 50';
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Student Rank Lookup
          </h1>
          <p className="text-gray-600">
            Enter your student ID to view your rank and credit hours
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                Student ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g., 20250001"
                  maxLength={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter your 8-digit student ID (e.g., 2022XXXX, 2023XXXX, etc.)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            {/* Header */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    ID: {result.id}
                  </h2>
                  <p className="text-sm text-gray-600">Year: {result.year}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {result.specialization || 'General'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Rank */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Rank</span>
                </div>
                <div className={`text-3xl font-bold ${getRankColor(result.rank)}`}>
                  {result.rank === 'N/A' ? 'N/A' : `#${result.rank}`}
                </div>
                {getRankBadge(result.rank) && (
                  <div className="mt-2 text-xs font-medium text-yellow-700">
                    {getRankBadge(result.rank)}
                  </div>
                )}
              </div>

              {/* GPA */}
              {/* <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">GPA</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {result.gpa || 'N/A'}
                </div>
                <div className="mt-2 text-xs text-blue-700">
                  {result.gpa && parseFloat(result.gpa) >= 3.4 ? 'Excellent' :
                   result.gpa && parseFloat(result.gpa) >= 2.8 ? 'Very Good' :
                   result.gpa && parseFloat(result.gpa) >= 2.4 ? 'Good' :
                   result.gpa && parseFloat(result.gpa) >= 2.0 ? 'Pass' : 'Needs Improvement'}
                </div>
              </div> */}

              {/* Credit Hours */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Credit Hours</span>
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {result.credit_hours || 'N/A'}
                </div>
                <div className="mt-2 text-xs text-green-700">
                  Completed
                </div>
              </div>
            </div>

            {/* Error Info */}
            {result.error && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-700">
                  <strong>Note:</strong> {result.error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {!result.error && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700 text-center">
                  ✓ Your academic record has been successfully retrieved
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Faculty of Computers and Artificial Intelligence</p>
          <p className="mt-1">Student Academic Records System</p>
        </div>
      </div>
    </div>
  );
}
