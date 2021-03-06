import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from "@mui/material";
import { Button } from "@mui/material";
import TableDropdown from "./TableDropdown";


const CustomerList = ({list, onDelete}) => {
    return <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Naslov</TableCell>
            <TableCell>Žanr</TableCell>
            <TableCell>Datum izdavanja</TableCell>
            <TableCell>Ocena</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.authors}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.genre}</TableCell>
              <TableCell>{row.publishDate}</TableCell>
              <TableCell>{row.rating}</TableCell>
              <TableCell>
                  <TableDropdown text="..."
                  items={
                      [
                        {text: "Pregledaj...", link: true, path: `/books/${row.id}/view`},
                        {text: "Izmeni...", link: true, path: `/books/${row.id}/edit`},
                        {text: "Obrisi", link: false, action: () => onDelete(row.id)}
                      ]
                  }
                  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
}

export default CustomerList;