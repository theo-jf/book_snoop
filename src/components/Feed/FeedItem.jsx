export default function FeedItem({food}) {
    return (
        <p>{food.count} {food.count > 1 ? 'users' : 'user'} added the {food.title} {food.cover} from {food.publisher} to their {food.from}</p>
    );
}