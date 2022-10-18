export default function AddressItem({address, setAddressPlaceId}) {

    const setMap = () => {
        setAddressPlaceId(address.googleMaps_placeId);
    }

    return (
        <div onClick={setMap} className="address">
            <p>{address.name}, {address.city} {address.state}</p>
            {/* <p># Users have found this item here in mostly ~average~ condition</p> */}
        </div>
    );
}