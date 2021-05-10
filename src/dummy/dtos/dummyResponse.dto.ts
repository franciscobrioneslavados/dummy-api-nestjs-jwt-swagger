import { ApiProperty } from '@nestjs/swagger';

export class DummyResponse {
  @ApiProperty({ description: 'Dummy Title', type: () => String })
  title: string;
  @ApiProperty({ description: 'Dummy Description', type: () => String })
  description: string;
}
