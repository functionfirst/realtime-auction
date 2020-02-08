import { convertToSlug } from "@/lib/convertToSlug"

class Auction {
  constructor({ _id, name, description, start_date, end_date, start_amount = 0, enabled = true, countdown = 1, bids = [], autobids = [] }) {
    this.id = _id
    this.name = name
    this.description = description
    this.start_date = start_date
    this.end_date = end_date
    this.start_amount = start_amount
    this.enabled = enabled
    this.countdown = countdown
    this.bids = bids
    this.autobids = autobids
  }

  get path() {
    const slug = convertToSlug(this.name)
    return `${slug}/${this.id}`
  }
}

export default Auction

