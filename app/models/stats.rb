# frozen_string_literal: true

class Stats
  def initialize(user)
    @user = user
  end

  def average_time
    average = bursts.map(&:time_taken).sum / bursts.size
    ChronicDuration.output(average, units: 1, hours: true, limit_to_hours: true)
  end

  def total_time
    time = bursts.map(&:time_taken).sum
    ChronicDuration.output(time, units: 1, hours: true, limit_to_hours: true)
  end

  def graph
    @bursts.group_by(&:completed_day).map do |completed_at, values|
      statistics(completed_at, values)
    end
  end

  def week
    start_date = Time.zone.now.beginning_of_week.beginning_of_day
    end_date   = Time.zone.now.end_of_week.end_of_day

    values = @bursts.where(completed_at: start_date..end_date)
    statistics(Time.zone.now, values)
  end

  def today
    start_date = Time.zone.now.beginning_of_day
    end_date   = Time.zone.now.end_of_day

    values = @bursts.where(completed_at: start_date..end_date)
    statistics(Time.zone.now, values)
  end

  def statistics(date, grouped_bursts)
    total_spent = grouped_bursts.map(&:time_taken).sum
    count = grouped_bursts.size
    worked_task_count = grouped_bursts.map(&:works).flatten.select {|work| work.worked? }.count
  
    return unless count > 0

    {
      date: date.strftime('%Y-%m-%d'),
      count: count,
      worked_task_count: worked_task_count,
      time_spent: total_spent,
      humanized_time_taken: ChronicDuration.output(total_spent, units: 1, hours: true, limit_to_hours: true),
      average: total_spent / count
    }
  end

  def bursts
    @bursts ||= @user.bursts.finished
  end

  def as_json
    {
      average_time: average_time,
      total_time: total_time,
      total: bursts.size,
      graph: graph,
      week: week,
      today: today
    }
  end
end
