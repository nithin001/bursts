# frozen_string_literal: true

class Stats
  def initialize(user)
    @user = user
  end

  def average_time
    bursts.map(&:time_taken).sum / bursts.size
  end

  def graph
    @bursts.group_by(&:completed_at).map do |completed_at, values|
      total_spent = values.map(&:time_taken).sum

      count = values.size
      {
        date: completed_at.strftime('%Y-%m-%d'),
        count: count,
        time_spent: total_spent,
        humanized_time_spent: ChronicDuration.output(total_spent, units: 2),
        average: total_spent / count
      }
    end
  end

  def bursts
    @bursts ||= @user.bursts.completed
  end

  def as_json
    {
      average_time: average_time,
      total: bursts.size,
      graph: graph
    }
  end
end
