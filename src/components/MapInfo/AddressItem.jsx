export default function AddressItem({address, setAddressPlaceId}) {

    const setMap = () => {
        setAddressPlaceId(address.googleMaps_placeId);
    }

    return (
        <div onClick={setMap} className="address">
            {console.log(address.item)}
            <p>{address.name}</p>
        </div>
    );
}