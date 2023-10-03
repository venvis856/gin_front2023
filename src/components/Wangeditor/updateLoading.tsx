import { useDispatch, useSelector } from 'react-redux';

export const GetLoading = () => {
  const wangEditorLoading = useSelector((state) => state.loadingReducer.wangEditorLoading)
  return wangEditorLoading
}

export const SetLoading = (data:boolean) => {
  const dipatch = useDispatch();
  dipatch({type:"loading_change_wang_editor",data:data})
}