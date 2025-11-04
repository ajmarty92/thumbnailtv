// Replace the analysis div with this:
{uploadedImage && !analyzing && (
  <>
    <div className="bg-tv-gray/50 border border-tv-red/30 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-tv-red flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-tv-red mb-2">TV Screen Analysis Results</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-300 mb-2">Critical Issues:</p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• 55" TV: Text appears small from 8 feet</li>
                <li>• 65" TV: Text barely readable at 10 feet</li>
                <li>• 75" TV: Logos get covered by UI elements</li>
                <li>• 85" TV: Critical text becomes invisible</li>
                <li>• 100" TV: Only center content visible</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-300 mb-2">Recommendations:</p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• Increase text size by 40% for 75"+ screens</li>
                <li>• Move key elements to center 60% area</li>
                <li>• Avoid bottom 25% for important content</li>
                <li>• Use high contrast colors for readability</li>
                <li>• Test on actual TV screens before publishing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Updated title */}
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold">Real TV Screen Previews</h3>
      <p className="text-gray-400">See how your thumbnail looks on different screen sizes from typical viewing distances</p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tvPlatforms.map((platform) => (
        <TVPlatformCard
          key={platform.id}
          platform={platform}
          thumbnailUrl={uploadedImage}
        />
      ))}
    </div>
  </>
)}
