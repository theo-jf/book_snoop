// MUI Imports
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

export default function AddressItem({address, setAddressPlaceId}) {

    const setMap = () => {
        setAddressPlaceId(address.googleMaps_placeId);
    }

    return (
        <Grid className="addressItem" item xs={12} sm={6} md={4} lg={3}>
            <CardContent onClick={setMap} className="address">
                <p>{address.name}</p> 
                <p>{address.city} {address.state}</p>
                <p className="addressStatistics">
                    Found here {address.count == 1 ? 'once' 
                                                   : `${address.count} times`} in mostly {address.most_common_condition} condition
                </p>
            </CardContent>
        </Grid>
    );
}