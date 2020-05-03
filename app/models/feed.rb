# frozen_string_literal: true

class Feed
  def initialize(user)
    @user = user
  end

  def as_json
    bursts.group_by(&:completed_day).map do |completed_at, values|
      mapped_bursts = values.map do |burst|
        tasks = burst.tasks.complete
        next if tasks.empty?

        {
          burst: burst,
          tasks: burst.tasks,
          from_to: burst.humanized_from_to,
        }
      end.compact

      next if mapped_bursts.empty?

      total_time_taken = values.map(&:time_taken).sum
      {
        date: completed_at.strftime('%Y-%m-%d'),
        bursts: mapped_bursts,
        humanized_time_taken: ChronicDuration.output(total_time_taken, units: 1, hours: true, limit_to_hours: true),
      }
    end.compact
  end

  def bursts
    @bursts ||= @user.bursts.completed
  end
end
