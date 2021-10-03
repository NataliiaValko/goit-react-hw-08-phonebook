import Avatar from '@material-ui/core/Avatar';
import s from './UserMenu.module.css';

const UserMenu = () => {
  return (
    <div className={s.userMenu}>
      <p className={s.text}>Welcome,</p>
      <Avatar
        sx={{
          marginRight: 2,
        }}
      >
        VN
      </Avatar>
      <p className={s.mail}>romasskka@mail.com</p>
      <button type="button" className={s.button} onClick={() => {}}>
        Exit
      </button>
    </div>
  );
};

export default UserMenu;
