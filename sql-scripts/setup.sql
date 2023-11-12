USE [TeslaRentingDB]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Locations](
	[Loc_Id] [int] IDENTITY(1,1) NOT NULL,
	[Loc_Name] [varchar](50) NOT NULL
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Models](
	[Mod_Id] [int] IDENTITY(1,1) NOT NULL,
	[Mod_Name] [varchar](50) NOT NULL,
	[Mod_PricePerDay] [money] NOT NULL,
	[Mod_Image] [varchar](50) NULL,
	[Mod_Seats] [int] NOT NULL,
	[Mod_Capacity] [int] NOT NULL,
	[Mod_Range] [int] NOT NULL
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reservations](
	[Res_Id] [int] IDENTITY(1,1) NOT NULL,
	[Res_CarId] [int] NOT NULL,
	[Res_UserId] [int] NOT NULL,
	[Res_DateStart] [int] NOT NULL,
	[Res_DateEnd] [int] NOT NULL,
	[Res_LocIdStart] [int] NOT NULL,
	[Res_LocIdEnd] [int] NOT NULL,
	[Res_Cost] [money] NOT NULL
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Usr_Id] [int] IDENTITY(1,1) NOT NULL,
	[Usr_FirstName] [varchar](50) NOT NULL,
	[Usr_LastName] [varchar](50) NOT NULL,
	[Usr_Email] [varchar](50) NOT NULL,
	[Usr_Phone] [varchar](20) NOT NULL
) ON [PRIMARY]
GO

INSERT [dbo].[Locations] ([Loc_Name]) VALUES (N'Palma Airport')
INSERT [dbo].[Locations] ([Loc_Name]) VALUES (N'Palma City Center')
INSERT [dbo].[Locations] ([Loc_Name]) VALUES (N'Alcudia')
INSERT [dbo].[Locations] ([Loc_Name]) VALUES (N'Manacor')
GO

INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model S Plaid', 49.1800, N'model-s-plaid.png', 5, 28, 396)
INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model S', 42.1800, N'model-s.png', 5, 28, 405)
INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model 3 Performance', 27.5500, N'model-3-performance.png', 5, 23, 315)
INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model 3 Long Range', 24.3200, N'model-3-long.png', 5, 23, 333)
INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model 3 Rear-Wheel Drive', 22.1800, N'model-3-rear.png', 5, 23, 272)
INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model X Plaid', 42.3100, N'model-x-plaid.png', 6, 88, 333)
INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model X', 38.7800, N'model-x.png', 7, 88, 348)
INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model Y Performance', 29.9900, N'model-y-performance.png', 5, 76, 303)
INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model Y Long Range', 26.7400, N'model-y-long.png', 7, 76, 330)
INSERT [dbo].[Models] ([Mod_Name], [Mod_PricePerDay], [Mod_Image], [Mod_Seats], [Mod_Capacity], [Mod_Range]) VALUES (N'Model Y Rear-Wheel Drive', 23.2500, N'model-y-rear.png', 5, 76, 260)
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Stores location names.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Locations'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Stores Tesla models information.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Models'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Stores reservations data.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Reservations'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Stores users data.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users'
GO
