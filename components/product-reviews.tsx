"use client"

import { useState } from "react"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "./ui/progress"


interface ProductReviewsProps {
  rating: number
  reviewCount: number
}

// This would typically come from a database or CMS
const reviews = [
  {
    id: 1,
    author: "Emily R.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 months ago",
    title: "Beautiful addition to my home",
    content:
      "This vase is even more beautiful in person. The craftsmanship is exceptional, and it looks perfect on my entryway table. I've received so many compliments!",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    author: "Michael T.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "3 months ago",
    title: "Great quality, slightly smaller than expected",
    content:
      "The quality of this vase is excellent. The only reason I'm giving 4 stars instead of 5 is that it was a bit smaller than I expected based on the photos. Still, it's a beautiful piece that I'm happy to have in my home.",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    author: "Sarah L.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "1 month ago",
    title: "Perfect housewarming gift",
    content:
      "I purchased this as a housewarming gift for my friend, and she absolutely loved it! The neutral color works perfectly with her decor, and the quality is outstanding. Will definitely be purchasing more items from this shop.",
    helpful: 5,
    verified: true,
  },
]

export default function ProductReviews({ rating, reviewCount }: ProductReviewsProps) {
  const [activeReviews, setActiveReviews] = useState(reviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [helpfulClicked, setHelpfulClicked] = useState<number[]>([])

  const markHelpful = (reviewId: number) => {
    if (!helpfulClicked.includes(reviewId)) {
      setHelpfulClicked([...helpfulClicked, reviewId])
      setActiveReviews(
        activeReviews.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
      )
    }
  }

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++
  })
  const ratingPercentages = ratingCounts.map((count) => (count / reviewCount) * 100)

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Rating Summary */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-medium text-[#3c3a36]">{rating}</div>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-[#a8a49e] text-[#a8a49e]" : "text-[#e2ded9]"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#6b6963]">Based on {reviewCount} reviews</p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center space-x-2">
                <div className="w-8 text-sm text-[#6b6963]">{star} star</div>
                <Progress value={ratingPercentages[star - 1]} className="h-2 w-full bg-[#e2ded9]" />
                <div className="w-8 text-right text-sm text-[#6b6963]">{ratingCounts[star - 1]}</div>
              </div>
            ))}
          </div>

          <Button
            className="mt-4 bg-[#a8a49e] text-white hover:bg-[#8c8880]"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            Write a Review
          </Button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="rounded-lg border border-[#e2ded9] bg-white p-4">
            <h3 className="mb-4 font-serif text-lg font-medium text-[#3c3a36]">Write Your Review</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="review-title" className="mb-1 block text-sm font-medium text-[#3c3a36]">
                  Title
                </label>
                <input
                  id="review-title"
                  className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                  placeholder="Summarize your experience"
                />
              </div>
              <div>
                <label htmlFor="review-content" className="mb-1 block text-sm font-medium text-[#3c3a36]">
                  Review
                </label>
                <Textarea
                  id="review-content"
                  className="min-h-[100px] border-[#e2ded9] placeholder:text-[#a8a49e] focus:ring-[#a8a49e]"
                  placeholder="Share your thoughts about this product"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#3c3a36]">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="p-1">
                      <Star className="h-5 w-5 text-[#e2ded9] hover:fill-[#a8a49e] hover:text-[#a8a49e]" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-[#a8a49e] text-white hover:bg-[#8c8880]">Submit Review</Button>
                <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {activeReviews.map((review) => (
          <div key={review.id} className="rounded-lg border border-[#e2ded9] bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-[#3c3a36]">{review.author}</h4>
                    {review.verified && (
                      <span className="rounded-full bg-[#e9e5e0] px-2 py-0.5 text-xs text-[#6b6963]">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6b6963]">{review.date}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-[#a8a49e] text-[#a8a49e]" : "text-[#e2ded9]"}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3">
              <h5 className="font-medium text-[#3c3a36]">{review.title}</h5>
              <p className="mt-2 text-sm text-[#6b6963]">{review.content}</p>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-1 text-xs ${
                  helpfulClicked.includes(review.id) ? "text-[#a8a49e]" : "text-[#6b6963]"
                }`}
                onClick={() => markHelpful(review.id)}
                disabled={helpfulClicked.includes(review.id)}
              >
                <ThumbsUp className="h-3 w-3" />
                <span>Helpful ({review.helpful})</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {reviewCount > 3 && (
        <div className="flex justify-center">
          <Button variant="outline" className="border-[#e2ded9] text-[#6b6963]">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  )
}
