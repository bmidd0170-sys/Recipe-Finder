// Mock data for top searches and user feedback
export const topSearches = [
    { id: 1, name: "Spaghetti Carbonara", searchCount: 1205, imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=400&fit=crop" },
    { id: 2, name: "Chicken Tikka Masala", searchCount: 1150, imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop" },
    { id: 3, name: "Beef Burgundy", searchCount: 980, imageUrl: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=500&h=400&fit=crop" },
    { id: 4, name: "Thai Green Curry", searchCount: 875, imageUrl: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=500&h=400&fit=crop" },
    { id: 5, name: "Vegetable Lasagna", searchCount: 850, imageUrl: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&h=400&fit=crop" },
    { id: 6, name: "Grilled Salmon", searchCount: 820, imageUrl: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=500&h=400&fit=crop" },
    { id: 7, name: "Mushroom Risotto", searchCount: 780, imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=400&fit=crop" },
    { id: 8, name: "Korean BBQ", searchCount: 765, imageUrl: "https://images.unsplash.com/photo-1632558610268-730d959ffa82?w=500&h=400&fit=crop" },
    { id: 9, name: "Chocolate Lava Cake", searchCount: 750, imageUrl: "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=500&h=400&fit=crop" },
    { id: 10, name: "Greek Salad", searchCount: 720, imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop" }
];

export const userFeedback = [
    {
        id: 1,
        user: {
            name: "Emma Thompson",
            avatar: "/images/profiles/profile1.svg",
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
            avatar: "/images/profiles/profile2.svg",
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
            avatar: "/images/profiles/profile3.svg",
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
            avatar: "/images/profiles/profile4.svg",
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
            avatar: "/images/profiles/profile5.svg",
            level: "Cooking Enthusiast"
        },
        recipe: "Korean BBQ",
        rating: 5,
        comment: "Authentic taste! Reminded me of my grandmother's cooking.",
        date: "2 weeks ago"
    }
];