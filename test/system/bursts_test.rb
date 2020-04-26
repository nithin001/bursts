require "application_system_test_case"

class BurstsTest < ApplicationSystemTestCase
  setup do
    @burst = bursts(:one)
  end

  test "visiting the index" do
    visit bursts_url
    assert_selector "h1", text: "Bursts"
  end

  test "creating a Burst" do
    visit bursts_url
    click_on "New Burst"

    fill_in "Completed at", with: @burst.completed_at
    fill_in "Started at", with: @burst.started_at
    fill_in "Status", with: @burst.status
    fill_in "User", with: @burst.user_id
    click_on "Create Burst"

    assert_text "Burst was successfully created"
    click_on "Back"
  end

  test "updating a Burst" do
    visit bursts_url
    click_on "Edit", match: :first

    fill_in "Completed at", with: @burst.completed_at
    fill_in "Started at", with: @burst.started_at
    fill_in "Status", with: @burst.status
    fill_in "User", with: @burst.user_id
    click_on "Update Burst"

    assert_text "Burst was successfully updated"
    click_on "Back"
  end

  test "destroying a Burst" do
    visit bursts_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Burst was successfully destroyed"
  end
end
