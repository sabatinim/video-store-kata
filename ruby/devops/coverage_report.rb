class CoverageReport
  def self.format(results, source_root:)
    root = File.expand_path(source_root)
    files = results.filter_map do |path, line_hits|
      expanded_path = File.expand_path(path)
      next unless expanded_path.start_with?("#{root}/")

      executable_lines = line_hits.compact
      covered_lines = executable_lines.count { |hits| hits.positive? }
      relative_path = expanded_path.delete_prefix("#{root}/")
      ["lib/#{relative_path}", covered_lines, executable_lines.length]
    end.sort_by(&:first)

    total_covered = files.sum { |_, covered, _| covered }
    total_executable = files.sum { |_, _, executable| executable }
    report = +"Coverage report:\n"

    files.each do |path, covered, executable|
      report << "  #{path}: #{covered}/#{executable} lines (#{percentage(covered, executable)}%)\n"
    end

    report << "Total: #{total_covered}/#{total_executable} lines (#{percentage(total_covered, total_executable)}%)\n"
  end

  def self.percentage(covered, total)
    return "0.0" if total.zero?

    Kernel.format("%.1f", covered.to_f / total * 100)
  end

  private_class_method :percentage
end
