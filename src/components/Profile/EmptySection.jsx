// MUI Imports
import Grid from "@mui/material/Grid";

export default function EmptySection({section}) {
    return (
        <Grid item xs={12} sm={12} md={12} lg={12} className="wishlistItem">
            <p className="emptySection">Your {section} is empty</p>
        </Grid>
    );
}