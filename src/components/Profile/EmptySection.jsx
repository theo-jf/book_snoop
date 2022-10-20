// MUI Imports
import Grid from "@mui/material/Grid";

export default function EmptySection({section}) {
    return (
        <Grid item xs={12} sm={6} md={3} lg={2} className="wishlistItem">
            <p>Your {section} is empty</p>
        </Grid>
    );
}