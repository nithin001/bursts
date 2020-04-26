require 'test_helper'

class BurstsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @burst = bursts(:one)
  end

  test "should get index" do
    get bursts_url
    assert_response :success
  end

  test "should get new" do
    get new_burst_url
    assert_response :success
  end

  test "should create burst" do
    assert_difference('Burst.count') do
      post bursts_url, params: { burst: { completed_at: @burst.completed_at, started_at: @burst.started_at, status: @burst.status, user_id: @burst.user_id } }
    end

    assert_redirected_to burst_url(Burst.last)
  end

  test "should show burst" do
    get burst_url(@burst)
    assert_response :success
  end

  test "should get edit" do
    get edit_burst_url(@burst)
    assert_response :success
  end

  test "should update burst" do
    patch burst_url(@burst), params: { burst: { completed_at: @burst.completed_at, started_at: @burst.started_at, status: @burst.status, user_id: @burst.user_id } }
    assert_redirected_to burst_url(@burst)
  end

  test "should destroy burst" do
    assert_difference('Burst.count', -1) do
      delete burst_url(@burst)
    end

    assert_redirected_to bursts_url
  end
end
