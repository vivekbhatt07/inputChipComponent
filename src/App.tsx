import { useState } from "react";
import "./App.css";
import {
  InputChipComponent,
  Menu,
  MenuItem,
  RoundedImageWrap,
} from "./component";
import userData from "./data";
import { User } from "./types";

function App() {
  const [userList, setUserList] = useState(userData);
  const [selectedUserList, setSelectedUserList] = useState([]);

  const handleMenuItem = (selectedUser: User) => {
    setUserList((prevUserList) => {
      return prevUserList.filter((user) => {
        return selectedUser.id !== user.id;
      });
    });
    // @ts-ignore
    setSelectedUserList((prevSelectedUserList) => {
      return [...prevSelectedUserList, selectedUser];
    });
  };

  return (
    <div className="">
      <InputChipComponent
        list={userList}
        chips={selectedUserList}
        originalList={userData}
        imageKey="avatar"
        labelKey="name"
        labelUnique="id"
        handleList={setUserList}
        // @ts-ignore
        handleChip={setSelectedUserList}
        placeholder="Add new user..."
      >
        <Menu>
          {userList.map((user) => {
            return (
              <MenuItem key={user.id} onClick={() => handleMenuItem(user)}>
                <div className="flex gap-3">
                  <RoundedImageWrap
                    dimension={40}
                    source={user.avatar}
                    alternative={user.name}
                  />
                  <div className="flex items-center justify-between gap-2 flex-1">
                    <h3 className="text-sm">{user.name}</h3>
                    <span className="text-sm">{user.email}</span>
                  </div>
                </div>
              </MenuItem>
            );
          })}
          {userList.length === 0 && (
            <div className="p-4">No User Available</div>
          )}
        </Menu>
      </InputChipComponent>
    </div>
  );
}

export default App;
