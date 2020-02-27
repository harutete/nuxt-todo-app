export default function ({ store, redirect }: any) {
  if (!store.getters.isLogin) {
    return redirect('/login')
  }
}