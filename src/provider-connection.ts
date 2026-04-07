import type { ErrorResponse } from "./types/error";
import type { paths } from "./types/schema";
import type { unsent } from "./unsent";

type GetProviderConnectionsResponseSuccess =
  paths["/v1/provider-connections"]["get"]["responses"]["200"]["content"]["application/json"];

type GetProviderConnectionsResponse = {
  data: GetProviderConnectionsResponseSuccess | null;
  error: ErrorResponse | null;
};

type CreateProviderConnectionPayload =
  NonNullable<paths["/v1/provider-connections"]["post"]["requestBody"]>["content"]["application/json"];

type CreateProviderConnectionResponseSuccess =
  paths["/v1/provider-connections"]["post"]["responses"]["200"]["content"]["application/json"];

type CreateProviderConnectionResponse = {
  data: CreateProviderConnectionResponseSuccess | null;
  error: ErrorResponse | null;
};

type DeleteProviderConnectionResponseSuccess =
  paths["/v1/provider-connections/{id}"]["delete"]["responses"]["200"]["content"]["application/json"];

type DeleteProviderConnectionResponse = {
  data: DeleteProviderConnectionResponseSuccess | null;
  error: ErrorResponse | null;
};

export class ProviderConnections {
  constructor(private readonly unsent: unsent) {
    this.unsent = unsent;
  }

  async list(): Promise<GetProviderConnectionsResponse> {
    const data = await this.unsent.get<GetProviderConnectionsResponseSuccess>("/provider-connections");
    return data;
  }

  async create(payload: CreateProviderConnectionPayload): Promise<CreateProviderConnectionResponse> {
    const data = await this.unsent.post<CreateProviderConnectionResponseSuccess>("/provider-connections", payload);
    return data;
  }

  async delete(id: string): Promise<DeleteProviderConnectionResponse> {
    const data = await this.unsent.delete<DeleteProviderConnectionResponseSuccess>(`/provider-connections/${id}`);
    return data;
  }
}
