package com.practice;

import com.google.common.collect.Lists;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import static java.util.Collections.emptyList;

@Controller
public class DummyDataController {

	private static List<Card> dummyCardList;

	static {
		final Card projectArchitectureDesign = Card.create(1l, "ProjectArchitectureDesign", "프로젝트 아케텍쳐 설계", Status.DONE.getViewDescription(), emptyList());

		Task projectSetting_1 = Task.create(1l, "IDE Setting", true);
		Task projectSetting_2 = Task.create(2l, "Server Setting", true);
		Task projectSetting_3 = Task.create(3l, "DB Setting", false);
		final Card projectSetting = Card.create(2l, "ProjectSetting", "프로젝트 환경설정", Status.IN_PROGRESS.getViewDescription(),
			Lists.newArrayList(projectSetting_1, projectSetting_2, projectSetting_3));

		Task dataMigration_1 = Task.create(4l, "ScheduleConsultations", false);
		Task dataMigration_2 = Task.create(5l, "MigrationServiceDevelopment", false);
		Task dataMigration_3 = Task.create(6l, "DataMigration", false);
		final Card dataMigration = Card.create(2l, "DataMigration", "데이터 이전", Status.TO_DO.getViewDescription(),
			Lists.newArrayList(dataMigration_1, dataMigration_2, dataMigration_3));

		final Card deploy = Card.create(3l, "ProjectDeploy", "배포", Status.TO_DO.getViewDescription(), emptyList());


		dummyCardList = Lists.newArrayList(projectSetting, dataMigration, deploy);
	}

	@RequestMapping(value = "/api/v1/kanban/cards", method = RequestMethod.GET)
	@ResponseBody
	public List<Card> getKanbanDummyData() {
		return dummyCardList;
	}

	@Getter
	@AllArgsConstructor(staticName = "create")
	private static class Card {

		private long id;
		private String title;
		private String description;
		private String status;
		private List<Task> taskList;
	}

	@Getter
	@AllArgsConstructor(staticName = "create")
	private static class Task {
		private long id;
		private String name;
		private boolean done;
	}

	@AllArgsConstructor
	private enum Status {
		TO_DO("to-do"),
		IN_PROGRESS("in-progress"),
		DONE("done");

		@Getter
		private String viewDescription;
	}
}
