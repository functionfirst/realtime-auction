import { convertToSlug } from "@/lib/convertToSlug"
import { format } from 'date-fns'

class Auction {
  constructor({ _id, name, description, startDate, endDate, startAmount = 0, enabled = true, countdown = 1, currentBid = {} }) {
    this.id = _id
    this.name = name
    this.description = description
    this.startDate = format(new Date(startDate), 'do MMM yyyy')
    this.endDate = format(new Date(endDate), 'do MMM yyyy')
    this.startAmount = startAmount
    this.enabled = enabled
    this.countdown = countdown
    this.currentBid = currentBid
  }

  get path() {
    const slug = convertToSlug(this.name)
    return `${slug}/${this.id}`
  }
}

export default Auction

