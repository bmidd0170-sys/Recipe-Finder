// Mock data for top searches and user feedback
export const topSearches = [
    { id: 1, name: "Spaghetti Carbonara", searchCount: 1205, imageUrl: "https://source.unsplash.com/random/150x150/?carbonara" },
    { id: 2, name: "Chicken Tikka Masala", searchCount: 1150, imageUrl: "https://source.unsplash.com/random/150x150/?curry" },
    { id: 3, name: "Beef Burgundy", searchCount: 980, imageUrl: "https://source.unsplash.com/random/150x150/?beef" },
    { id: 4, name: "Thai Green Curry", searchCount: 875, imageUrl: "https://source.unsplash.com/random/150x150/?thai" },
    { id: 5, name: "Vegetable Lasagna", searchCount: 850, imageUrl: "https://source.unsplash.com/random/150x150/?lasagna" },
    { id: 6, name: "Grilled Salmon", searchCount: 820, imageUrl: "https://source.unsplash.com/random/150x150/?salmon" },
    { id: 7, name: "Mushroom Risotto", searchCount: 780, imageUrl: "https://source.unsplash.com/random/150x150/?risotto" },
    { id: 8, name: "Korean BBQ", searchCount: 765, imageUrl: "https://source.unsplash.com/random/150x150/?bbq" },
    { id: 9, name: "Chocolate Lava Cake", searchCount: 750, imageUrl: "https://source.unsplash.com/random/150x150/?cake" },
    { id: 10, name: "Greek Salad", searchCount: 720, imageUrl: "https://source.unsplash.com/random/150x150/?salad" }
];

export const userFeedback = [
    {
        id: 1,
        user: {
            name: "Emma Thompson",
            avatar: "https://source.unsplash.com/random/50x50/?woman",
            level: "Master Chef"
        },
        recipe: "Spaghetti Carbonara",
        rating: 5,
        comment: "Perfect recipe! The instructions were clear and the result was amazing. My family loved it!",
        date: "2 days ago"
    },
    {
        id: 2,
        user: {
            name: "James Chen",
            avatar: "https://source.unsplash.com/random/50x50/?man",
            level: "Home Cook"
        },
        recipe: "Thai Green Curry",
        rating: 4,
        comment: "Great authentic taste! Just a bit spicy for my preference but overall excellent.",
        date: "3 days ago"
    },
    {
        id: 3,
        user: {
            name: "Sofia Rodriguez",
            avatar: "https://source.unsplash.com/random/50x50/?girl",
            level: "Food Enthusiast"
        },
        recipe: "Mushroom Risotto",
        rating: 5,
        comment: "Restaurant quality! The texture was perfect and the flavors were balanced.",
        date: "1 week ago"
    },
    {
        id: 4,
        user: {
            name: "Michael O'Connor",
            avatar: "https://source.unsplash.com/random/50x50/?boy",
            level: "Amateur Chef"
        },
        recipe: "Beef Burgundy",
        rating: 4,
        comment: "Rich and flavorful! Takes time but worth the effort.",
        date: "1 week ago"
    },
    {
        id: 5,
        user: {
            name: "Laura Kim",
            avatar: "https://source.unsplash.com/random/50x50/?person",
            level: "Cooking Enthusiast"
        },
        recipe: "Korean BBQ",
        rating: 5,
        comment: "Authentic taste! Reminded me of my grandmother's cooking.",
        date: "2 weeks ago"
    }
];