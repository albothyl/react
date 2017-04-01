package com.practice;

import com.google.common.collect.Lists;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Collections.emptyList;

@Slf4j
@CrossOrigin
@RequestMapping(value = "/api/v1/kanban")
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


		dummyCardList = Lists.newArrayList(projectArchitectureDesign, projectSetting, dataMigration, deploy);
	}

	@RequestMapping(value = "/cards", method = RequestMethod.GET)
	@ResponseBody
	public List<Card> getCardList() {
		log.info("/cards");
		return dummyCardList;
	}

	@RequestMapping(value = "/cards/{cardId}", method = RequestMethod.GET)
	@ResponseBody
	public Card getCard(@PathVariable long cardId) {
		log.info("/cards/{cardId} / GET");
		return dummyCardList.stream().filter(_card -> _card.getId() == cardId).findFirst().get();
	}

	@RequestMapping(value = "/cards/{cardId}", method = RequestMethod.PUT)
	@ResponseBody
	public Card modifyCard(@PathVariable long cardId, @ModelAttribute Card inputedCard) {
		log.info("/cards/{cardId} / PUT");
		final Card card = dummyCardList.stream().filter(_card -> _card.getId() == cardId).findFirst().get();
		card.modify(inputedCard.getTitle(), inputedCard.getDescription(), inputedCard.getStatus());
		return inputedCard;
	}

	@RequestMapping(value = "/cards/{cardId}/tasks", method = RequestMethod.POST)
	@ResponseBody
	public List<Task> getTaskList(@PathVariable long cardId) {
		log.info("/cards/{cardId}/tasks / POST");
		final Card card = dummyCardList.stream().filter(_card -> _card.getId() == cardId).findFirst().get();
		return card.getTasks();
	}

	@RequestMapping(value = "/cards/{cardId}/tasks/{taskId}", method = RequestMethod.DELETE)
	@ResponseBody
	public Task deleteTask(@PathVariable long cardId, @PathVariable long taskId) {
		log.info("/cards/{cardId}/tasks/{taskId} / DELETE");
		final Card card = dummyCardList.stream().filter(_card -> _card.getId() == cardId).findFirst().get();
		final Task task = card.getTasks().stream().filter(_task -> _task.getId() == taskId).findFirst().get();
		card.getTasks().remove(task);
		return task;
	}

	@RequestMapping(value = "/cards/{cardId}/tasks/{taskId}", method = RequestMethod.PUT)
	@ResponseBody
	public Task addTask(@PathVariable long cardId, @PathVariable long taskId, @ModelAttribute Task inputedTask) {
		log.info("/cards/{cardId}/tasks/{taskId} / PUT");
		final Card card = dummyCardList.stream().filter(_card -> _card.getId() == cardId).findFirst().get();
		card.getTasks().add(inputedTask);
		return inputedTask;
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor(staticName = "create")
	private static class Card {

		private long id;
		private String title;
		private String description;
		private String status;
		private List<Task> tasks;

		public void modify(String title, String description, String status) {
			this.title = title;
			this.description = description;
			this.status = status;
		}
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor(staticName = "create")
	private static class Task {
		private long id;
		private String name;
		private boolean done;

		public void modify(String name, boolean done) {
			this.name = name;
			this.done = done;
		}
	}

	@AllArgsConstructor
	private enum Status {
		TO_DO("todo"),
		IN_PROGRESS("in-progress"),
		DONE("done");

		@Getter
		private String viewDescription;
	}
}
