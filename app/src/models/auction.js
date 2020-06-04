import { convertToSlug } from "@/lib/convertToSlug"

class Auction {
  constructor({
    id,
    image,
    name,
    description,
    hasStarted,
    hasFinished,
    startDate,
    endDate,
    createdAt,
    featured,
    startAmount = 0,
    enabled = true,
    countdown = 1,
    currentBid = {}
  }) {
    this.id = id
    this.image = image
    this.name = name
    this.description = description
    this.startDate = new Date(startDate)
    this.endDate = new Date(endDate)
    this.startAmount = startAmount
    this.enabled = enabled
    this.featured = featured
    this.countdown = countdown
    this.currentBid = currentBid
    this.hasFinished = hasFinished
    this.hasStarted = hasStarted
    this.createdAt = createdAt
  }

  get path() {
    const slug = convertToSlug(this.name)
    return `/auctions/${slug}/${this.id}`
  }
}

export default Auction

