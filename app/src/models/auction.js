import { convertToSlug } from "@/lib/convertToSlug"

class Auction {
  constructor({
    countdown = 1,
    createdAt,
    currentBid = {},
    description,
    enabled = true,
    endDate,
    featured,
    hasStarted,
    hasFinished,
    id,
    image,
    name,
    startAmount = 0,
    startDate
  }) {
    this.countdown = countdown
    this.createdAt = createdAt
    this.currentBid = currentBid
    this.description = description
    this.enabled = enabled
    this.endDate = new Date(endDate)
    this.featured = featured
    this.hasStarted = hasStarted
    this.hasFinished = hasFinished
    this.id = id
    this.image = image
    this.name = name
    this.startAmount = startAmount
    this.startDate = new Date(startDate)
  }

  get path() {
    const slug = convertToSlug(this.name)
    return `/auctions/${slug}/${this.id}`
  }
}

export default Auction

