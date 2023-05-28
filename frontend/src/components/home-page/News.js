import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea } from '@mui/material';

export default function createNews(data, openModalFunc){
    return (
        <MultiActionAreaCard
            src={data.src}
            alt={data.alt}
            date={data.date}
            title={data.title}
            description={data.description}
            openModalFunc={openModalFunc}
        />
      )  
}

function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 240 }} onClick={()=>{props.openModalFunc(props)}}>
      <CardActionArea >
        <CardMedia
          component="img"
          height="140"
          image={props.src}
          alt={props.title}
        />
        <CardContent>
          <Typography  variant="h6" component="div" noWrap={true} 
           >
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

