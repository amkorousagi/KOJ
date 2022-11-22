import dayjs from "dayjs";

export function now(format) {
  return format !== undefined
    ? dayjs().locale("ko").format(format)
    : dayjs().locale("ko").format();
}
