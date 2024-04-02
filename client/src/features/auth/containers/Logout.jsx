import {useDispatch, useSelector} from 'react-redux';
import {selectLoggedInUser, signOutAsync} from '../authSlice';
import {useEffect} from 'react';
import {Navigate} from 'react-router-dom';

export default function Logout() {
  const dispatch = useDispatch();
  const loggedInUserSelector = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });
  return (
    <>{!loggedInUserSelector && <Navigate to="/login" replace={true} />}</>
  );
}
