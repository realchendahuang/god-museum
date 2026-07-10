#!/usr/bin/env ruby

require "pathname"

root = Pathname.new(__dir__).join("..").expand_path
errors = []
ids = Hash.new { |hash, key| hash[key] = [] }
markdown_files = Dir.glob(root.join("**/*.md")).sort
link_count = 0

markdown_files.each do |absolute_file|
  file = Pathname.new(absolute_file)
  relative_file = file.relative_path_from(root)
  content = file.read

  front_matter = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  if front_matter
    front_matter[1].scan(/^id:\s*(\S+)\s*$/).flatten.each do |id|
      ids[id] << relative_file.to_s
    end
  end

  content.scan(/\]\(([^)]+)\)/).flatten.each do |link|
    next if link.match?(/\A(?:https?:|mailto:|#)/)

    path = link.split("#", 2).first
    next if path.nil? || path.empty?

    link_count += 1
    target = file.dirname.join(path).cleanpath
    errors << "#{relative_file}: missing #{link}" unless target.exist?
  end
end

ids.each do |id, files|
  next if files.length == 1

  errors << "duplicate id #{id}: #{files.join(', ')}"
end

if errors.empty?
  puts "Catalog valid: #{markdown_files.length} Markdown files, #{ids.length} stable IDs, #{link_count} local links."
  exit 0
end

warn errors.join("\n")
exit 1
