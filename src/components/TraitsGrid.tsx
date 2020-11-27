import React, {useState} from 'react';
import './TraitsGrid.scss';
import traits from "../services/traits";
import {Card, CardContent, GridList, GridListTile, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

interface Props {

}

// const MIN_SELECTIONS = 5;
const MAX_SELECTIONS = 10;

const TraitsGrid: React.FC<Props> = (() => {
    const [openError, setOpenError] = useState(false);
    const [selected, setSelections] = useState([] as number[])

    const tileOnClickListener = (id: number) => {
        console.log(`clicked on ${id}`)
        if (selected.includes(id))
            setSelections(selected.filter(sId => sId !== id));
        else {
            if (selected.length >= MAX_SELECTIONS)
                setOpenError(true);
            else setSelections(selected.concat([id]));
        }
    }

    const makeTraitTile = (trait: string, id: number) => {
        return (
            <GridListTile key={id} onClick={() => tileOnClickListener(id)}>
                <Card raised={false} className={"trait-tile" + (selected.includes(id) ? ' active' : '')}>
                    <CardContent>
                        <Typography variant="h5">{trait}</Typography>
                    </CardContent>
                </Card>
            </GridListTile>
        )
    }

    const handleErrorClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };


    return (
        <Paper elevation={3} className="traits-paper">
            <GridList cellHeight={"auto"} spacing={1} cols={0} className="traits-grid">
                {traits().map(makeTraitTile)}
            </GridList>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error">
                    Prašome pasirinkti ne daugiau nei {MAX_SELECTIONS} savybių
                </Alert>
            </Snackbar>
        </Paper>
    )
});

export default TraitsGrid;