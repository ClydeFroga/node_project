/**
 * DTO для передачи данных пользователя между слоями
 */
export class UserDto {
  id: number;
  balance: number;

  constructor(id: number, balance: number) {
    this.id = id;
    this.balance = balance;
  }

  static fromEntity(user: any): UserDto {
    return new UserDto(user.getId(), user.getBalance());
  }
}
