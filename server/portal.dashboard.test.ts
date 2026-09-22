import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(user: TrpcContext["user"]): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

const regularUser: AuthenticatedUser = {
  id: 12,
  openId: "regular-user",
  email: "citizen@novaera.test",
  name: "Cidadão Teste",
  loginMethod: "manus",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

describe("portal.dashboard", () => {
  it("returns the public dashboard structure with hierarchy and live stats", async () => {
    const caller = appRouter.createCaller(createContext(null));
    const result = await caller.portal.dashboard();

    expect(result.hierarchy).toHaveLength(14);
    expect(result.stats).toMatchObject({ uptime: "99.8%" });
    expect(result.onlineMembers.length).toBeGreaterThan(0);
    expect(result.announcements.length).toBeGreaterThan(0);
  });

  it("blocks staff mutations for regular members", async () => {
    const caller = appRouter.createCaller(createContext(regularUser));

    await expect(
      caller.portal.createAnnouncement({
        title: "Tentativa não autorizada",
        content: "Esta ação deve ser bloqueada pela política de staff.",
      }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
