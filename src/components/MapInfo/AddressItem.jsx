export default function AddressItem({address, setAddressPlaceId}) {

    const setMap = () => {
        setAddressPlaceId(address.googleMaps_placeId);
    }

    return (
        <div onClick={setMap} className="address">
            <p>{address.name}, {address.city} {address.state}</p>
            <p>Found here {address.count} times in mostly {address.most_common_condition} condition</p>
        </div>
    );
}