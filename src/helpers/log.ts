export class Log {
  static write(scope: string, message: string) {
    const date = new Date();
    date.setHours(date.getHours() + 3);

    const localDate = date.toJSON().slice(0, -5).replace(/T/, ' ');

    //Много страшных буков для того, чтобы менялся цвет текста
    console.log(`[${localDate}]: \x1b[32m[${scope}]\x1b[0m ${message}`);
  }
}
