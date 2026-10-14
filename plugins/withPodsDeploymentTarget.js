const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

// Xcode 27's iOS SDK rejects deployment targets below 15.0. Some pods
// (SDWebImage, ReachabilitySwift, Lottie) still declare older minimums,
// so raise every pod target to at least the app's deployment target.
const MIN_TARGET = '15.1';
const MARKER = '# withPodsDeploymentTarget';

const snippet = `
    ${MARKER}
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        current = build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET']
        if current.nil? || Gem::Version.new(current) < Gem::Version.new('${MIN_TARGET}')
          build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${MIN_TARGET}'
        end
      end
    end
`;

module.exports = function withPodsDeploymentTarget(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let podfile = fs.readFileSync(podfilePath, 'utf8');
      if (!podfile.includes(MARKER)) {
        podfile = podfile.replace(/post_install do \|installer\|\n/, (match) => match + snippet);
        fs.writeFileSync(podfilePath, podfile);
      }
      return config;
    },
  ]);
};
