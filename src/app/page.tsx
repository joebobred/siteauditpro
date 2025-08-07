'use client'
import { useState } from 'react'
import { CheckCircle, AlertTriangle, XCircle, Shield, Users, TrendingUp, Award } from 'lucide-react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResults(null)

    // Auto-add https:// if not present
    let processedUrl = url
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      processedUrl = 'https://' + url
    }

    try {
      // Simulate API call - we'll replace this with real scanning later
      await new Promise(resolve => setTimeout(resolve, 3000)) // 3 second loading

      // Mock results for demo
      const mockResults = {
        url: processedUrl,
        summary: {
          errors: Math.floor(Math.random() * 10) + 1,
          warnings: Math.floor(Math.random() * 15) + 5,
          passed: Math.floor(Math.random() * 20) + 15,
          score: Math.floor(Math.random() * 40) + 60
        },
        issues: [
          {
            type: 'error',
            rule: 'color-contrast',
            description: 'Insufficient color contrast ratio detected',
            impact: 'Serious',
            help: 'Ensure text has a contrast ratio of at least 4.5:1'
          },
          {
            type: 'error', 
            rule: 'alt-text-missing',
            description: 'Images missing alternative text',
            impact: 'Critical',
            help: 'Add descriptive alt attributes to all images'
          },
          {
            type: 'warning',
            rule: 'heading-structure',
            description: 'Heading levels skip from H1 to H3',
            impact: 'Moderate',
            help: 'Use headings in sequential order (H1, H2, H3, etc.)'
          },
          {
            type: 'warning',
            rule: 'form-labels',
            description: 'Form inputs without associated labels',
            impact: 'Moderate', 
            help: 'Associate form controls with descriptive labels'
          }
        ]
      }

      setResults(mockResults)
    } catch {
      setError('Failed to scan website. Please try again.')
    }
    setLoading(false)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save email to database/mailing list
    alert(`Thanks! We'll send the detailed report to ${email}`)
    setShowEmailForm(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Good'
    if (score >= 60) return 'Needs Work'
    return 'Poor'
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              {/* Simple Logo */}
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                SiteAuditPro
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Award className="h-4 w-4" />
              <span>Free Website Accessibility Checker</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Scan Form */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute inset-0 h-full w-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40" />
          </svg>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Website Accessibility Check
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Instantly scan your website for accessibility issues. 
              Get actionable insights to improve user experience for everyone.
            </p>
          </div>

          {/* Scan Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleScan} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Website URL to scan
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="yourwebsite.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    disabled={loading}
                    className="flex-1 px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <button 
                    type="submit" 
                    disabled={loading || !url}
                    className="px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Scanning...' : 'Scan Now'}
                  </button>
                </div>
              </div>
              
              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600 mt-4">Analyzing your website for accessibility issues...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      {!results && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <span className="text-lg font-medium text-gray-700">WCAG 2.1 Compliant</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="text-lg font-medium text-gray-700">Industry Standard Tools</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <TrendingUp className="h-8 w-8 text-purple-500" />
                <span className="text-lg font-medium text-gray-700">Instant Results</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {results && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Results Header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Accessibility Scan Results
                  </h2>
                </div>
                <p className="text-gray-600">Scanned: {results.url}</p>
              </div>

              {/* Score Summary */}
              <div className="p-8 border-b bg-white">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className={`text-4xl font-bold ${getScoreColor(results.summary.score)} mb-2`}>
                      {results.summary.score}%
                    </div>
                    <div className="text-gray-600 font-medium">Accessibility Score</div>
                    <div className={`font-medium ${getScoreColor(results.summary.score)} text-sm`}>
                      {getScoreLabel(results.summary.score)}
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="text-4xl font-bold text-red-600 mb-2">{results.summary.errors}</div>
                    <div className="text-gray-600 font-medium">Errors</div>
                    <div className="text-sm text-gray-500">Must fix</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">{results.summary.warnings}</div>
                    <div className="text-gray-600 font-medium">Warnings</div>
                    <div className="text-sm text-gray-500">Should fix</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">{results.summary.passed}</div>
                    <div className="text-gray-600 font-medium">Passed</div>
                    <div className="text-sm text-gray-500">Working well</div>
                  </div>
                </div>
              </div>

              {/* Issues List */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
                  Issues Found
                </h3>
                <div className="space-y-4">
                  {results.issues.map((issue: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 border-l-4 border-orange-400">
                      {issue.type === 'error' ? (
                        <XCircle className="h-6 w-6 text-red-500 mt-1" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{issue.description}</h4>
                        <p className="text-sm text-gray-600 mb-2">{issue.help}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            issue.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {issue.impact} Impact
                          </span>
                          <span className="text-gray-500">Rule: {issue.rule}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA for Detailed Report */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Want a Detailed PDF Report?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Get a comprehensive report with step-by-step fix instructions, 
                    code examples, and priority recommendations sent straight to your inbox.
                  </p>
                  
                  {!showEmailForm ? (
                    <button 
                      onClick={() => setShowEmailForm(true)}
                      className="px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
                    >
                      Get Free PDF Report
                    </button>
                  ) : (
                    <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                      <div className="flex gap-4">
                        <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="flex-1 px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
                        <button 
                          type="submit" 
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                          Send Report
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        We will never spam you. One-time report delivery only.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Social Proof / Why This Matters */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Website Accessibility Matters
            </h2>
            <p className="text-xl text-gray-600">
              Making your website accessible isn't just the right thing to do - it's good business
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-blue-600 mb-2">1 in 4</div>
              <p className="text-gray-600 font-medium">Adults have a disability that affects their web use</p>
              <p className="text-sm text-gray-500 mt-2">That is 61 million people in the US alone</p>
            </div>
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
              <p className="text-gray-600 font-medium">Of websites fail basic accessibility tests</p>
              <p className="text-sm text-gray-500 mt-2">Do not let your site be one of them</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-600 mb-2">$13T</div>
              <p className="text-gray-600 font-medium">Annual spending power of people with disabilities</p>
              <p className="text-sm text-gray-500 mt-2">A massive market opportunity</p>
            </div>
          </div>
        </div>
      </section>

{/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="text-xl font-bold">SiteAuditPro</div>
          </div>
          
          {/* Legal Disclaimer */}
          <div className="max-w-4xl mx-auto text-center mb-6">
            <div className="text-xs text-gray-400 leading-relaxed space-y-2">
              <p>
                <strong>Disclaimer:</strong> SiteAuditPro provides automated accessibility scanning for informational purposes only. 
                Our scans are not comprehensive accessibility audits and may not identify all accessibility issues or barriers.
              </p>
              <p>
                Results should not be considered as legal advice or a guarantee of compliance with accessibility laws including 
                but not limited to the Americans with Disabilities Act (ADA), Web Content Accessibility Guidelines (WCAG), or other regulations.
              </p>
              <p>
                We recommend consulting with qualified accessibility professionals and conducting manual testing for critical applications. 
                SiteAuditPro disclaims all liability for any damages or legal issues arising from reliance on our scanning results.
              </p>
              <p>
                By using our service, you acknowledge that website accessibility compliance is your responsibility and that 
                our tool is one resource among many that should be used in your accessibility evaluation process.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-400 text-sm border-t border-gray-800 pt-6">
            &copy; 2024 SiteAuditPro. Making the web accessible for everyone.
            <br />
            <span className="text-xs">
              This tool provides guidance only. Professional accessibility audits recommended for compliance verification.
            </span>
          </p>
        </div>
      </footer>
    </main>
  )
}