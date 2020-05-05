# frozen_string_literal: true

namespace :assets do
  desc 'Synchronize assets to remote (assumes assets are already compiled)'
  task add_webpack: :environment do
    webpack_manifest_file = "#{ActionView::Base.assets_manifest.dir}/asset-manifest.json"
    if File.exist?(webpack_manifest_file)
      manifest = Sprockets::Manifest.new(ActionView::Base.assets_manifest.environment, ActionView::Base.assets_manifest.dir)
      t = manifest.instance_variable_get('@data')
      manifest_data = open(webpack_manifest_file).read
      t['assets'].merge!(JSON.parse(manifest_data)['files'])
      manifest.instance_variable_set('@data', t)
      manifest.save
      puts 'merged webpack assets with rails assets'
    else
      puts "webpack manifest file not found at #{webpack_manifest_file}"
    end
  end
end

Rake::Task['assets:precompile'].enhance do
  Rake::Task['assets:add_webpack'].invoke
end
