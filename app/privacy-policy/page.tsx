import React from 'react'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#181818] py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
        
        <div className="bg-[#1E1E1E] p-8 rounded-xl shadow-lg border border-purple-500/10">
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <p>
              This privacy policy applies to the Shira app (hereby referred to as "Application") for mobile devices that was created by Ian Carscadden (hereby referred to as "Service Provider") as a Freemium service. This service is intended for use "AS IS".
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Information Collection and Use</h2>
            <p>
              The Application collects information when you download and use it. This information may include information such as
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Your device's Internet Protocol address (e.g. IP address)</li>
              <li>The pages of the Application that you visit, the time and date of your visit, the time spent on those pages</li>
              <li>The time spent on the Application</li>
              <li>The operating system you use on your mobile device</li>
            </ul>
            
            <p>
              The Application does not gather precise information about the location of your mobile device.
            </p>
            
            <p>
              The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.
            </p>
            
            <p>
              For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information, including but not limited to Email. The information that the Service Provider request will be retained by them and used as described in this privacy policy.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Third Party Access</h2>
            <p>
              Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
            </p>
            
            <p>
              Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Expo</li>
              <li>RevenueCat</li>
            </ul>
            
            <p>
              The Service Provider may disclose User Provided and Automatically Collected Information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>as required by law, such as to comply with a subpoena, or similar legal process;</li>
              <li>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
              <li>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Opt-Out Rights</h2>
            <p>
              You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Data Retention Policy</h2>
            <p>
              The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at hi@meetshira.com and they will respond in a reasonable time.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Children</h2>
            <p>
              The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.
            </p>
            
            <p>
              The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider (hi@meetshira.com) so that they will be able to take the necessary actions.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Security</h2>
            <p>
              The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Changes</h2>
            <p>
              This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
            </p>
            
            <p>
              This privacy policy is effective as of 2025-03-14
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Your Consent</h2>
            <p>
              By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at hi@meetshira.com.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 