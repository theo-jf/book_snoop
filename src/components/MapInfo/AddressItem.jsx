import { useEffect } from "react";

// MUI Imports
import CardContent from "@mui/material/CardContent";

export default function AddressItem({address, setAddressPlaceId, highlightedAddressId, setHighlightedAddressId, isFirstItem}) {

    // If this is the first address in the list (first being mapped), 
    //      automatically pull up the map for this address and highlight this address item
    useEffect(() => {
        if (isFirstItem) {
            setHighlightedAddressId(address.id);
            setAddressPlaceId(address.googleMaps_placeId);
        }
    }, []);

    const setMap = () => {
        setAddressPlaceId(address.googleMaps_placeId);
    }

    return (
        // <Grid className="addressItem" item xs={12} sm={6} md={4} lg={3}>
        <div className={(highlightedAddressId === address.id ? 'highlighted addressItem' : 'addressItem')} onClick={() => setHighlightedAddressId(address.id)}>
            <CardContent onClick={setMap} className="address">
                <h4 className="addressTitle">{address.name}</h4> 
                <p className="addressInfo">{address.city}, {address.state}</p>
                <p className="addressStatistics">
                    Found here {address.count == 1 ? <span className="statCount">once </span>
                                                   : <span className="statCount">{address.count} times </span>} 
                               {address.most_common_condition != undefined ? <>in {address.count == 1 ? null 
                                                                                                      : 'mostly '} 
                                                                             <span className={address.most_common_condition}>{address.most_common_condition}</span> condition</>
                                                                           : null}
                </p>
            </CardContent>
        </div>
        // </Grid>
    );
}