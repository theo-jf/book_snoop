import CardContent from "@mui/material/CardContent";

export default function FeedItem({food}) {
    return (
        <CardContent className="feedItem">
            <p className="feedItemContent"><span className="bolded">{food.count}</span> {food.count > 1 ? 'users' : 'user'} added the <span className="bolded">{food.title} {food.cover}</span> from {food.publisher} to their {food.from}</p>
        </CardContent>
    );
}