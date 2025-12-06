"use client";

import { useSession } from "@/lib/contexts/SessionContext";
import { TempKey } from "@/lib/utils/enums";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const SideBarContext = createContext({
	isCollapsed: true,
	toggleSideBar: () => {}
});

export function SideBarProvider({ children }: { children: React.ReactNode }) {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const { session } = useSession();

	useEffect(() => {
		const storedValue = localStorage.getItem(TempKey.Sidebar);
		if (storedValue !== null) setIsCollapsed(JSON.parse(storedValue));
	}, []);
	useEffect(() => {
		localStorage.setItem(TempKey.Sidebar, JSON.stringify(isCollapsed));
	}, [isCollapsed]);

	const toggleSideBar = () => setIsCollapsed(!isCollapsed);

	if (!session) return;

	return (
		<SideBarContext.Provider value={{ isCollapsed, toggleSideBar }}>
			{children}
		</SideBarContext.Provider>
	);
}

export const useSideBar = () => useContext(SideBarContext);
