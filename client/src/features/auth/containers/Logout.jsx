import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {selectLoggedInUser, signOutAsync} from '../authSlice';

export default function Logout() {
  const dispatch = useDispatch();
  const userSelector = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });

  return (
    <>{!userSelector && <Navigate to="/login" replace={true}></Navigate>}</>
  );
}
