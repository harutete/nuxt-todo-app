export default function ({ store, redirect }: any) {
  if (!store.getters.user) {
    return redirect('/login')
  }
}
