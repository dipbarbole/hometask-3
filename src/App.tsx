import { useState, useEffect } from "react";
import { StyledEngineProvider } from "@mui/material/styles";

import { Table, Filters, Sort, Search } from "./components";
import { getImages, getUsers, getAccounts } from "./mocks/api";

import styles from "./App.module.scss";

import type { Row } from "./components";
import type { Image, User, Account, Rows } from "../types";

import rows from "./mocks/rows.json";

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = rows.data;

const dataConverter = (
  users: User[],
  accounts: Account[],
  images: Image[]
): Rows[] => {
  const rows = [];

  for (let i = 0; i <= users.length + 1; i++) {
    if (users[i]) {
      rows.push({
        avatar: images[i].url,
        username: users[i].username,
        country: users[i].country,
        name: users[i].name,
        lastPayments: accounts[i].payments.length,
        posts: accounts[i].posts,
      });
    }
  }

  return rows;
};

function App() {
  const [data, setData] = useState<Row[]>(undefined);

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => {
        console.log(dataConverter(users, accounts, images));
        setData(dataConverter(users, accounts, images));
      }
    );
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters />
            <Sort />
          </div>
          <Search />
        </div>
        <Table rows={data || mockedData} />
      </div>
    </StyledEngineProvider>
  );
}

export default App;
