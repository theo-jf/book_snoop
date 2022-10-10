export default function AddressItem({address, setAddressPlaceId}) {

    const setMap = () => {
        setAddressPlaceId(address.googleMaps_placeId);
    }

    return (
        <div onClick={setMap} className="address">
            <p>{address.name}</p>
        </div>
    );
}