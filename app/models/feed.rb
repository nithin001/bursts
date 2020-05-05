# frozen_string_literal: true

class Feed
  PER_PAGE = 5

  def initialize(user, from_date, to_date, page)
    @user = user
    @from_date = from_date
    @to_date = to_date
    @page = page
  end

  def as_json
    { activities: activities,
      total_activities: day_wise_bursts.count }
  end

  def activities
    days_in_result = day_wise_bursts.keys.sort.reverse

    offset_start = @page * (Feed::PER_PAGE + 1) >= days_in_result.length ? days_in_result.length - Feed::PER_PAGE : @page * Feed::PER_PAGE
    days_in_result[offset_start, Feed::PER_PAGE].map do |date|
      values = day_wise_bursts[date]
      mapped_bursts = values.map do |burst|
        {
          burst: burst,
          tasks: burst.tasks,
          from_to: burst.humanized_from_to
        }
      end

      total_time_taken = values.map(&:time_taken).sum
      {
        date: date.strftime('%Y-%m-%d'),
        bursts: mapped_bursts,
        humanized_time_taken: ChronicDuration.output(total_time_taken, units: 2)
      }
    end
  end

  def day_wise_bursts
    @day_wise_bursts ||= bursts.group_by(&:completed_day)
  end

  def bursts
    @bursts ||= @user.bursts.finished.where(completed_at: @from_date..@to_date)
  end

  def paginated_bursts
    @paginated_bursts ||= bursts.offset(offset_start).limit(PER_PAGE)
  end
end
