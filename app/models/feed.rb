# frozen_string_literal: true

class Feed
  PER_PAGE = 5

  def initialize(user, from_date, end_date, page)
    @user = user
    @from_date = from_date
    @end_date = end_date
    @page = page
  end

  def as_json
    { activities: activities,
      total_activities: day_wise_bursts.count }
  end

  def activities
    days_in_result = day_wise_bursts
                     .keys
                     .sort
                     .reverse
    paginated_days_in_results = Kaminari.paginate_array(days_in_result)
                                        .page(@page)
                                        .per(Feed::PER_PAGE)

    paginated_days_in_results.map do |date|
      values = day_wise_bursts[date]
      mapped_bursts = values.map do |burst|
        {
          burst: burst.as_json({ methods: %i[humanized_time_taken humanized_from_to humanized_completed_at], include: { works: { include: :task } } }),
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
    @bursts ||= @user.bursts
                     .finished
                     .where('completed_at >= ? AND completed_at <= ?',
                            @from_date.beginning_of_day,
                            @end_date.end_of_day)
  end

  def paginated_bursts
    @paginated_bursts ||= bursts.offset(offset_start).limit(PER_PAGE)
  end
end
